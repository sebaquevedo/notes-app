import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {
  note: any;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.note = this.noteService.getNoteById(id);
  }
}
