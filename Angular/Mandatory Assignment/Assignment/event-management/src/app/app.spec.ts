import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";
import { of } from "rxjs";
import { describe, it, expect } from "vitest";
import { routes } from "./app.routes";
import { EventList } from "./features/events/components/event-list/event-list";
import { EventDetail } from "./features/events/components/event-detail/event-detail";
import { EventService } from "./core/services/event.service";

const EVENTS = [
  { id: 1, title: "Angular Workshop", date: "2026-05-10", category: "tech", description: "d1", location: "l1" },
  { id: 2, title: "HR Policy Meeting", date: "2026-05-12", category: "hr", description: "d2", location: "l2" },
];

function configure() {
  TestBed.configureTestingModule({
    providers: [
      provideRouter(routes),
      {
        provide: EventService,
        useValue: {
          getEvents: () => of(EVENTS),
          getEventById: (id: number) => of(EVENTS.find((e) => e.id === id)),
        },
      },
    ],
  });
}

describe("Routing", () => {
  it("[Routing] should define the '' route for the event list", () => {
    const route = routes.find((r) => r.path === "");
    expect(route?.component).toBe(EventList);
  });

  it("[Routing] should define the 'event/:id' route for the event detail", () => {
    const route = routes.find((r) => r.path === "event/:id");
    expect(route?.component).toBe(EventDetail);
  });

  it("[Routing] navigating to '/' should show the event list", async () => {
    configure();
    const harness = await RouterTestingHarness.create();
    const list = await harness.navigateByUrl("/", EventList);
    expect(list).toBeTruthy();
    expect(harness.routeNativeElement?.textContent).toContain("Angular Workshop");
  });

  it("[Routing] navigating to '/event/2' should show the details of event 2", async () => {
    configure();
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl("/event/2", EventDetail);
    const text = harness.routeNativeElement?.textContent || "";
    expect(text).toContain("HR Policy Meeting");
    expect(text).not.toContain("Angular Workshop");
  });
});
