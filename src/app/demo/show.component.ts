import { JsonPipe } from "@angular/common";
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component ({
  standalone: true,
  imports: [JsonPipe],
  selector: "app-show",
  changeDetection: ChangeDetectionStrategy.Eager,
  template: "<div>{{data | json}}</div>"
})
export class ShowComponent {

  @Input ()
  public data;

}
