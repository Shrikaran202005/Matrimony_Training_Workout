import { TestBed } from "@angular/core/testing";
import { firstValueFrom, isObservable } from "rxjs";
import { describe, it, expect, beforeEach } from "vitest";
import { EventService } from "./event.service";

const CATEGORIES = ["tech", "hr", "fun", "training"];

describe("EventService", () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [EventService] });
    service = TestBed.inject(EventService);
  });

  it("[Service] should be created and injectable", () => {
    expect(service).toBeTruthy();
  });

  it("[Service] getEvents() should return an Observable of a non-empty array", async () => {
    const result = service.getEvents();
    expect(isObservable(result)).toBe(true);
    const data = await firstValueFrom(result);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("[Service] getEventById(id) should return an Observable of the matching event", async () => {
    const result = service.getEventById(1);
    expect(isObservable(result)).toBe(true);
    const data = await firstValueFrom(result);
    expect(data?.id).toBe(1);
  });

  it("[Service] getEventById(id) should return the right event for every id and undefined for an unknown id", async () => {
    const all = await firstValueFrom(service.getEvents());
    for (const e of all) {
      const found = await firstValueFrom(service.getEventById(e.id));
      expect(found?.id).toBe(e.id);
      expect(found?.title).toBe(e.title);
    }
    expect(await firstValueFrom(service.getEventById(999))).toBeUndefined();
  });

  it("[Service] events should follow the data model (fields, unique id, allowed categories)", async () => {
    const all: any[] = await firstValueFrom(service.getEvents());
    const fields = ["id", "title", "date", "category", "description", "location"];
    for (const e of all) {
      expect(Object.keys(e).sort()).toEqual([...fields].sort());
      expect(typeof e.id).toBe("number");
      for (const f of ["title", "date", "category", "description", "location"]) {
        expect(typeof e[f]).toBe("string");
        expect(e[f].length).toBeGreaterThan(0);
      }
      expect(Number.isNaN(Date.parse(e.date))).toBe(false);
      expect(CATEGORIES).toContain(e.category);
    }
    expect(new Set(all.map((e) => e.id)).size).toBe(all.length);
  });

  it("[Service] should keep at least 4 events with ids starting at 1", async () => {
    const all = await firstValueFrom(service.getEvents());
    expect(all.length).toBeGreaterThanOrEqual(4);
    expect(Math.min(...all.map((e) => e.id))).toBe(1);
  });
});
