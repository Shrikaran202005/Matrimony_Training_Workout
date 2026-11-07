import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PollOption {
  id: number;
  name: string;
  votes: number;
}

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poll.html',
  styleUrls: ['./poll.css']
})
export class PollComponent {
  pollQuestion = "Which frontend framework do you prefer?";

  options = signal<PollOption[]>([
    { id: 1, name: "Angular", votes: 0 },
    { id: 2, name: "React", votes: 0 },
    { id: 3, name: "Vue", votes: 0 },
    { id: 4, name: "Svelte", votes: 0 }
  ]);

  hasVoted = signal<boolean>(false);

  totalVotes = computed(() => {
    return this.options().reduce((sum, option) => sum + option.votes, 0);
  });

  vote(id: number): void {
    if (this.hasVoted()) return;

    this.options.update(currentOptions => 
      currentOptions.map(option => 
        option.id === id ? { ...option, votes: option.votes + 1 } : option
      )
    );
    
    this.hasVoted.set(true);
  }

  getPercentage(votes: number): number {
    if (this.totalVotes() === 0) return 0;
    return Math.round((votes / this.totalVotes()) * 100);
  }

  resetPoll(): void {
    this.options.update(currentOptions => 
      currentOptions.map(option => ({ ...option, votes: 0 }))
    );
    this.hasVoted.set(false);
  }
}