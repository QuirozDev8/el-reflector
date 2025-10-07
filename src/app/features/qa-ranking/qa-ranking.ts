import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface Score {
  name: string;
  score: number;
}

@Component({
  selector: 'app-qa-ranking',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './qa-ranking.html',
  styleUrl: './qa-ranking.css'
})

export class QaRanking implements OnInit {
  quizForm: FormGroup;
  questions: Question[] = [
    {
      question: '¿En qué año se construyó la sede central?',
      options: ['1978', '1977', '1976', '1972'],
      correct: 1
    },
    {
      question: '¿Quién fue la fundadora de la I.E?',
      options: ['Lucelly Villegas Vasquez', 'Ana Lorenza Villegas Restrepo', 'Juan Guillermo Villa Ospina', 'Sofia Lorenza Villegas de Santos'],
      correct: 1
    },
    {
      question: 'Menciona las 3 Sedes',
      options: ['Lorenza Villegas de Santos, Simona Duque, Esteban Jaramillo', 'Simona jaramillo, Esteban Duque, Lorenza V. de santos', 'Esteban Jaramillo, Simona de Santos, Lorenza Duque', 'Lorenza Jaramillo, Simona Jaramillo, Simona Duque'],
      correct: 0
    },
    {
      question: '¿Cuál es la intención del reflector?',
      options: ['Vender', 'Reflejar/mostrar lo que somos', 'Promocionar imágen', 'Publicar momentos lindos'],
      correct: 1
    },
    {
      question: '¿Quién es lectorcita?',
      options: ['Una mariposa', 'Un personaje', 'Una luciérnaga', 'Una oruga'],
      correct: 1
    },
    {
      question: 'Luz que inspira, conocimiento que __________',
      options: ['Brilla', 'Resalta', 'Transforma', 'Refleja'],
      correct: 2
    },
    {
      question: '¿Por qué se destacó Juliana Bautista?',
      options: ['Por sus libros', 'Por sus chistes', 'Por su creatividad', 'Por el baile urbano'],
      correct: 2
    },
    {
      question: '¿Por qué se destacó Violeta Torres?',
      options: ['Por su creatividad', 'Por su humor', 'Por su escritura', 'Por el deporte'],
      correct: 3
    },
    {
      question: '¿Por qué se destacó Chelsy Luciana Hincapié?',
      options: ['Por el baile urbano', 'Por el deporte', 'Por su Cabello', 'Por sus poemas'],
      correct: 0
    },
    {
      question: '¿Cuál es el nombre complete de Nuestro rector?',
      options: ['Juan Felipe Villa Ospina', 'Juan Guillermo Villa Ospina', 'Juan Villa', 'Juan Gabriel Villa Ospina'],
      correct: 1
    },
    {
      question: '¿Cuál es el nombre de la personera?',
      options: ['Maria José', 'Maria', 'Maria Fernanda', 'Susana Villegas'],
      correct: 2
    },
    {
      question: '¿Cuál es el nombre de la representante estudiantil actual?',
      options: ['Jimena', 'Juana', 'Juliana', 'Sara'],
      correct: 0
    }
  ];
  score: number | null = null;
  showSuccess = false;
  ranking: Score[] = [];
  currentQuestionIndex = 0;

  constructor(private fb: FormBuilder) {
    const formControls: { [key: string]: any } = { userName: ['', Validators.required] };
    this.questions.forEach((_, i) => {
      formControls[`q${i}`] = ['', Validators.required];
    });
    this.quizForm = this.fb.group(formControls);
  }

  ngOnInit() {
    this.loadRanking();
  }

  onSubmit() {
    if (this.quizForm.valid) {
      this.score = 0;
      for (let i = 0; i < this.questions.length; i++) {
        if (this.quizForm.value[`q${i}`] == this.questions[i].correct) {
          this.score++;
        }
      }
      this.saveScore(this.quizForm.value.userName, this.score);
      this.showSuccess = true;
    }
  }

  nextQuestion() {
    if (this.quizForm.value[`q${this.currentQuestionIndex}`] !== '') {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  resetQuiz() {
    this.quizForm.reset();
    this.score = null;
    this.showSuccess = false;
    this.currentQuestionIndex = 0;
  }

  private saveScore(name: string, score: number) {
    const scores: Score[] = JSON.parse(localStorage.getItem('qaRanking') || '[]');
    scores.push({ name, score });
    scores.sort((a, b) => b.score - a.score);
    this.ranking = scores.slice(0, 10);
    localStorage.setItem('qaRanking', JSON.stringify(scores));
  }

  private loadRanking() {
    const scores: Score[] = JSON.parse(localStorage.getItem('qaRanking') || '[]');
    this.ranking = scores.slice(0, 10);
  }
}