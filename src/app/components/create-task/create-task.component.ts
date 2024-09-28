import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Task } from '../../models/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  @Output() newTask = new EventEmitter<Task>();
  modal: boolean = false;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      completed: [false],
      people: this.fb.array([], this.minFormArrayLength(1)),
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([], this.minFormArrayLength(1))
    });
    this.people.push(personForm);
  }

  minFormArrayLength(minLength: number): ValidatorFn {
    return (formArray: AbstractControl): { [key: string]: any } | null => {
      if (formArray instanceof FormArray) {
        return formArray.length >= minLength ? null : { minLengthArray: { valid: false } };
      } else {
        return { minLengthArray: { valid: false } };
      }
    };
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
    this.taskForm.controls['date'].setValue(
      new Date().toISOString().substring(0, 10)
    );
  }

  setYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.taskForm.controls['date'].setValue(
      yesterday.toISOString().substring(0, 10)
    );
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      const errors = [];
  
      if (this.taskForm.get('title')?.invalid) {
        errors.push('El título es obligatorio.');
      }
      if (this.taskForm.get('date')?.invalid) {
        errors.push('La fecha es obligatoria.');
      }
      if (this.taskForm.get('people')?.errors?.['minLengthArray']) {
        errors.push(`Debe haber al menos una persona en la tarea.`);
      }
      this.people.controls.forEach((person, index) => {
        if (person.get('name')?.invalid) {
          if (person.get('name')?.errors?.['required']) {
            errors.push(`El nombre de la persona ${index + 1} es obligatorio.`);
          }
          if (person.get('name')?.errors?.['minlength']) {
            errors.push(`El nombre de la persona ${index + 1} debe tener al menos 5 caracteres.`);
          }
        }
        if (person.get('age')?.invalid) {
          if (person.get('age')?.errors?.['required']) {
            errors.push(`La edad de la persona ${index + 1} es obligatoria.`);
          }
          if (person.get('age')?.errors?.['min']) {
            errors.push(`La edad de la persona ${index + 1} debe ser mayor o igual a 18.`);
          }
        }
        if (person.get('skills')?.invalid) {
          errors.push(`La persona ${index + 1} debe tener al menos una habilidad.`);
        }
        // Validación de habilidades individuales
        const skillsArray = person.get('skills') as FormArray;
        skillsArray.controls.forEach((skillControl, skillIndex) => {
          if (skillControl.invalid) {
            errors.push(`La habilidad ${skillIndex + 1} de la persona ${index + 1} es obligatoria.`);
          }
        });
      });
  
      Swal.fire({
        title: '¡No se pudo Crear!',
        text: errors.join('\n'),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      const newTask: Task = this.taskForm.value;
      this.modal = false;
      this.taskForm.reset();
      this.taskForm.setControl('people', this.fb.array([]));
      this.newTask.emit(newTask);
    }
  }  
}
