import { TestBed } from "@angular/core/testing";
import { describe, it, expect, beforeEach } from "vitest";
import { EventFilter } from "./event-filter";

describe("EventFilter", () => {
  let fixture: any;
  let component: EventFilter;
  let emitted: any[];

  const input = () => fixture.nativeElement.querySelector("input") as HTMLInputElement;
  const select = () => fixture.nativeElement.querySelector("select") as HTMLSelectElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    fixture = TestBed.createComponent(EventFilter);
    component = fixture.componentInstance;
    emitted = [];
    component.filterChange.subscribe((v: any) => emitted.push(v));
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it("[Filter] should provide a search input and a category select with all categories", () => {
    expect(input()).toBeTruthy();
    expect(select()).toBeTruthy();
    const values = Array.from(select().options).map((o) => o.value);
    for (const c of ["tech", "hr", "fun", "training"]) {
      expect(values).toContain(c);
    }
    expect(values[0]).toBe(""); // first option is "All"
  });

  it("[Filter] typing in the search box should update `search` and emit filterChange", () => {
    input().value = "Angular";
    input().dispatchEvent(new Event("input"));
    expect(component.search).toBe("Angular");
    expect(emitted.length).toBeGreaterThan(0);
    expect(emitted[emitted.length - 1]).toEqual({ search: "Angular", category: "" });
  });

  it("[Filter] choosing a category should update `category` and emit filterChange", () => {
    select().value = "hr";
    select().dispatchEvent(new Event("change"));
    expect(component.category).toBe("hr");
    expect(emitted[emitted.length - 1]).toEqual({ search: "", category: "hr" });
  });

  it("[Filter] should emit both search and category together", () => {
    input().value = "Team";
    input().dispatchEvent(new Event("input"));
    select().value = "fun";
    select().dispatchEvent(new Event("change"));
    expect(emitted[emitted.length - 1]).toEqual({ search: "Team", category: "fun" });
  });

  it("[Filter] onClearFilters() should reset search and category and emit", () => {
    component.search = "Cleanup";
    component.category = "fun";
    emitted.length = 0;
    component.onClearFilters();
    expect(component.search).toBe("");
    expect(component.category).toBe("");
    expect(emitted[emitted.length - 1]).toEqual({ search: "", category: "" });
  });
});
