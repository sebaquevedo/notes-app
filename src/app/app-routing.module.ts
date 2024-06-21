import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { NoteEditComponent } from './components/note-edit/note-edit.component';

const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: 'detail/:id', component: NoteDetailComponent },
  { path: 'edit/:id', component: NoteEditComponent },
  { path: 'create', component: NoteEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
