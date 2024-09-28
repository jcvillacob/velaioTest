import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  @Output() newTask = new EventEmitter<any>();
  modal: boolean = false;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      fecha: ['', Validators.required],
      completed: [false],
      people: this.fb.array([])
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([])
    });
    this.people.push(personForm);
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  getSkills(index: number): FormArray {
    return this.people.at(index).get('skills') as FormArray;
  }

  addSkill(personIndex: number) {
    this.getSkills(personIndex).push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  createTask() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  setTodayDate() {
    this.taskForm.controls['fecha'].setValue(
      new Date().toISOString().substring(0, 10)
    );
  }

  setYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.taskForm.controls['fecha'].setValue(
      yesterday.toISOString().substring(0, 10)
    );
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this.modal = false;
      this.taskForm.reset();
      this.taskForm.setControl('people', this.fb.array([]));
      this.newTask.emit(newTask);
    } else {
      Swal.fire({
        title: '¡No se pudo Crear!',
        text: 'Debes llenar todos los campos.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

}
