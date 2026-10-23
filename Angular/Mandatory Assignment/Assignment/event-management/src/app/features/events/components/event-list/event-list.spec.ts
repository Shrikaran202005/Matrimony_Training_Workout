import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Router, provideRouter } from "@angular/router";
import { of } from "rxjs";
import { describe, it, expect, vi } from "vitest";
import { EventList } from "./event-list";
import { EventCard } from "../event-card/event-card";
import { EventFilter } from "../event-filter/event-filter";
import { EventService } from "../../../../core/services/event.service";

const EVENTS = [
  { id: 1, title: "Angular Workshop", date: "2026-05-10", category: "tech", description: "d1", location: "l1" },
  { id: 2, title: "HR Policy Meeting", date: "2026-05-12", category: "hr", description: "d2", location: "l2" },
  { id: 3, title: "Team Outing", date: "2026-05-15", category: "fun", description: "d3", location: "l3" },
  { id: 4, title: "Angular Advanced", date: "2026-05-18", category: "training", description: "d4", location: "l4" },
];

// textContent of sibling elements is concatenated without spaces, so no leading \b
const NO_EVENTS_MESSAGE = /no\s+(events?|results?)/i;

function setup(events: any[] = EVENTS) {
  const getEvents = vi.fn(() => of(events));
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      { provide: EventService, useValue: { getEvents, getEventById: vi.fn() } },
    ],
  });
  const navigate = vi.spyOn(TestBed.inject(Router), "navigate").mockResolvedValue(true);
  const fixture = TestBed.createComponent(EventList);
  fixture.detectChanges();
  const cards = () => fixture.debugElement.queryAll(By.directive(EventCard));
  const titles = () =>
    cards().map((c) => (c.nativeElement.textContent || "").toLowerCase());
  const filter = () =>
    fixture.debugElement.query(By.directive(EventFilter)).componentInstance as EventFilter;
  const apply = (f: { search: string; category: string }) => {
    fixture.componentInstance.onFilterChange(f);
    fixture.changeDetectorRef.markForCheck(); // TestBed is zoneless: direct calls do not mark the view dirty
    fixture.detectChanges();
  };
  return { fixture, component: fixture.componentInstance, getEvents, navigate, cards, titles, filter, apply };
}

describe("EventList", () => {
  it("[Data] should call getEvents() and store the events", () => {
    const { component, getEvents } = setup();
    expect(getEvents).toHaveBeenCalled();
    expect(component.events.length).toBe(4);
    expect(component.filteredEvents.length).toBe(4);
  });

  it("[Data] should display every event from the service using the event card", () => {
    const { cards, titles } = setup();
    expect(cards().length).toBe(4);
    for (const e of EVENTS) {
      expect(titles().some((t) => t.includes(e.title.toLowerCase()))).toBe(true);
    }
  });

  it("[Filter] should integrate the event filter component", () => {
    const { fixture } = setup();
    expect(fixture.debugElement.query(By.directive(EventFilter))).toBeTruthy();
  });

  it("[Filter] search should filter events by title (case-insensitive) and update the UI", () => {
    const { cards, titles, apply } = setup();
    apply({ search: "angular", category: "" });
    expect(cards().length).toBe(2);
    expect(titles().every((t) => t.includes("angular"))).toBe(true);
  });

  it("[Filter] category should filter events, and clearing the filter shows everything again", () => {
    const { cards, titles, apply } = setup();
    apply({ search: "", category: "hr" });
    expect(cards().length).toBe(1);
    expect(titles()[0]).toContain("hr policy meeting");
    apply({ search: "angular", category: "training" });
    expect(cards().length).toBe(1);
    expect(titles()[0]).toContain("angular advanced");
    apply({ search: "", category: "" });
    expect(cards().length).toBe(4);
  });

  it("[Filter] values emitted by the filter component should update the list immediately", () => {
    const { fixture, cards, titles, filter } = setup();
    filter().filterChange.emit({ search: "team", category: "" });
    fixture.detectChanges();
    expect(cards().length).toBe(1);
    expect(titles()[0]).toContain("team outing");
  });

  it("[Routing] clicking an event card should navigate to /event/:id", () => {
    const { fixture, navigate, cards } = setup();
    const third = cards()[2].componentInstance as EventCard;
    third.eventClick.emit(3);
    fixture.detectChanges();
    expect(navigate).toHaveBeenCalledWith(["/event", 3]);
  });

  it("[Routing] onEventClick(id) should navigate using the event id", () => {
    const { component, navigate } = setup();
    component.onEventClick(2);
    expect(navigate).toHaveBeenCalledWith(["/event", 2]);
  });

  it("[Conditional] should show a message and no cards when there are no events", () => {
    const { fixture, cards } = setup([]);
    expect(cards().length).toBe(0);
    expect(fixture.nativeElement.textContent).toMatch(NO_EVENTS_MESSAGE);
  });

  it("[Conditional] should show a message when filtering returns no results", () => {
    const { fixture, cards, apply } = setup();
    expect(fixture.nativeElement.textContent).not.toMatch(NO_EVENTS_MESSAGE);
    apply({ search: "zzz-no-such-event", category: "" });
    expect(cards().length).toBe(0);
    expect(fixture.nativeElement.textContent).toMatch(NO_EVENTS_MESSAGE);
  });
});
