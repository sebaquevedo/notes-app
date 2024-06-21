import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note.interface';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.notes = this.noteService.getAllNotes();
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id);
    this.notes = this.noteService.getAllNotes();
  }
}
