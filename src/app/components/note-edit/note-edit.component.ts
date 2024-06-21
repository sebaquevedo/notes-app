import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit {
  note: any = { title: '', content: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.note = this.noteService.getNoteById(id) || { title: '', content: '' };
  }

  saveNote(): void {
    if (this.note.id) {
      this.noteService.updateNote(
        this.note.id,
        this.note.title,
        this.note.content
      );
    } else {
      this.noteService.addNote(this.note.title, this.note.content);
    }
    this.router.navigate(['/']);
  }
}
