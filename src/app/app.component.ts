import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./course-card/course-card.component";
import { HighlightedDirective } from "./directives/highlighted.directive";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  courses = COURSES;

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  cards: QueryList<ElementRef>;

  @ViewChild("prova")
  prova: ElementRef;

  // RIFERIMENTO A DIRETTIVA NELLA CLASSE TS
  // si utilizza il @ViewChild decorator, con nome classe direttiva
  @ViewChild(HighlightedDirective)
  highLightDirective: HighlightedDirective;

  // in caso avessi più direttive su di un componente e voglio specificare quale riferire, posso fare riferimento al componente e tramite proprietà read definire la direttiva
  @ViewChild(CourseCardComponent, { read: HighlightedDirective })
  highLightDirective2: HighlightedDirective;
  constructor() {}

  // METODO RICHIAMATO DALL'EVENTO CUSTOM toggleIsHighLighted DELLA DIRETTIVA highlighted
  onToggle($event) {
    console.log("evento emesso");
    console.log($event);
  }

  // da qui, se vedo l'oggetto nativeElement corrispondente all'elemento trovo fra le sue proprietà classList che mi elenca le classi ad esso associate (un array di stringhe), mentre className mi restituisce una stringa con le classi
  ngAfterViewInit() {
    console.log(this.prova.nativeElement.classList);
    console.log(this.prova.nativeElement.className);
    console.log(this.cards.toArray()[0].nativeElement.classList);
    console.log(this.highLightDirective);
    console.log(this.highLightDirective2);
  }

  onCourseSelected(course: Course) {}
}
