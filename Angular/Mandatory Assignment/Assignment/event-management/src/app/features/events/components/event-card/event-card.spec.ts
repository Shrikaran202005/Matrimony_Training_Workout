import { TestBed } from "@angular/core/testing";
import { describe, it, expect } from "vitest";
import { EventCard } from "./event-card";

const EVENT = {
  id: 7,
  title: "Angular Workshop",
  date: "2026-05-10",
  category: "tech",
  description: "Learn Angular basics",
  location: "Chennai",
};

function create(event: any = EVENT) {
  const fixture = TestBed.createComponent(EventCard);
  fixture.componentRef.setInput("event", event);
  fixture.detectChanges();
  const emitted: any[] = [];
  fixture.componentInstance.eventClick.subscribe((v: any) => emitted.push(v));
  return { fixture, component: fixture.componentInstance, emitted };
}

describe("EventCard", () => {
  it("[IO] should receive the event through Input and display title, date and category", () => {
    const { fixture } = create();
    const text = (fixture.nativeElement.textContent || "").toLowerCase();
    expect(text).toContain(EVENT.title.toLowerCase());
    expect(text).toContain(EVENT.category.toLowerCase());
    // the date may be shown as given or formatted with a date pipe
    expect(text.includes(EVENT.date) || text.includes("2026")).toBe(true);
  });

  it("[IO] should emit the event id through Output when the card is clicked", () => {
    const { fixture, emitted } = create();
    (fixture.nativeElement.firstElementChild as HTMLElement).click();
    expect(emitted).toEqual([7]);
  });

  it("[IO] onClick() should emit the id of the event it received", () => {
    const { component, emitted } = create({ ...EVENT, id: 42 });
    component.onClick();
    expect(emitted).toEqual([42]);
  });
});
