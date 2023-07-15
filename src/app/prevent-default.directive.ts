import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[preventDefault]"
})

export class PreventDefaultDirective {
  @HostListener("click", ["$event"]) click($event: Event) {
    $event.preventDefault();
  }

  @HostListener("mousedown", ["$event"]) mouseDown($event: Event) {
    $event.preventDefault();
  }
}
