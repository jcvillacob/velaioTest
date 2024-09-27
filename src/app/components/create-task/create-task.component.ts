import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  modal: boolean = true;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      fecha: ['', Validators.required],
      description: ['', Validators.required],
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
      age: ['', [Validators.required, Validators.min(0)]],
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
      console.log('Nueva tarea creada:', newTask);
      // Aquí puedes agregar la lógica para manejar la nueva tarea, como agregarla a un array o enviarla a un backend.
      this.modal = false; // Cerrar el modal después de la creación de la tarea
      this.taskForm.reset(); // Reiniciar el formulario
      // Reiniciar los arrays
      this.taskForm.setControl('people', this.fb.array([]));
    } else {
      console.log('Formulario no válido');
    }
  }

}
