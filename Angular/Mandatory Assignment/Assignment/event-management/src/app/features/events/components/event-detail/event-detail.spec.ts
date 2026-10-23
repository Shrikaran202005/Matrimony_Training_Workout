import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { of } from "rxjs";
import { describe, it, expect, vi } from "vitest";
import { EventDetail } from "./event-detail";
import { EventService } from "../../../../core/services/event.service";

const EVENTS = [
  { id: 1, title: "Angular Workshop", date: "2026-05-10", category: "tech", description: "Learn Angular basics", location: "Chennai" },
  { id: 2, title: "HR Policy Meeting", date: "2026-05-12", category: "hr", description: "Discuss company policies", location: "Bangalore" },
  { id: 3, title: "Team Outing", date: "2026-05-15", category: "fun", description: "Outdoor activities", location: "Pondicherry" },
];

function render(id: string) {
  const getEventById = vi.fn((n: number) => of(EVENTS.find((e) => e.id === n)));
  const route = {
    snapshot: { paramMap: convertToParamMap({ id }), params: { id } },
    paramMap: of(convertToParamMap({ id })),
    params: of({ id }),
  };
  TestBed.configureTestingModule({
    providers: [
      { provide: ActivatedRoute, useValue: route },
      { provide: EventService, useValue: { getEventById, getEvents: () => of(EVENTS) } },
    ],
  });
  const fixture = TestBed.createComponent(EventDetail);
  fixture.detectChanges();
  return { fixture, getEventById, text: (fixture.nativeElement.textContent || "").toLowerCase() };
}

describe("EventDetail", () => {
  it("[Data] should read the id from the route and call getEventById(id) with a number", () => {
    const { getEventById } = render("2");
    expect(getEventById).toHaveBeenCalledWith(2);
  });

  it("[Data] should display title, date, category, description and location", () => {
    const { text } = render("2");
    const e = EVENTS[1];
    expect(text).toContain(e.title.toLowerCase());
    expect(text).toContain(e.category.toLowerCase());
    expect(text).toContain(e.description.toLowerCase());
    expect(text).toContain(e.location.toLowerCase());
    expect(text.includes(e.date) || text.includes("2026")).toBe(true);
  });

  it("[Routing] should load the correct event for the route parameter", () => {
    const { text } = render("3");
    expect(text).toContain("team outing");
    expect(text).not.toContain("hr policy meeting");
  });
});
