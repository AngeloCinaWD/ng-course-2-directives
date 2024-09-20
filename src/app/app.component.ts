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

  constructor() {}

  // da qui se vedo l'oggetto nativeElement corrispondente all'elemento trovo fra le sue proprietà classList che mi elenca le classi ad esso associate (un array di stringhe), mentre className mi restituisce una stringa con le classi
  ngAfterViewInit() {
    console.log(this.prova.nativeElement.classList);
    console.log(this.prova.nativeElement.className);
    console.log(this.cards.toArray()[0].nativeElement.classList);
  }

  onCourseSelected(course: Course) {}
}
