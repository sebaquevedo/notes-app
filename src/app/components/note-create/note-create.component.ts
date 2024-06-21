import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss'],
})
export class NoteCreateComponent {
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
