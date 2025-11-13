import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, computed } from '@angular/core';

@Component({
  selector: 'date-loading-bar',
  imports: [ CommonModule ],
  templateUrl: './date-loading-bar.html',
  styleUrl: './date-loading-bar.scss',
})
export class DateLoadingBar implements OnInit, OnDestroy{

  @Input() set start(value: Date | string) {
    this.startDate = value instanceof Date ? value : new Date(value);
  }
  
  @Input() set end(value: Date | string) {
    this.endDate = value instanceof Date ? value : new Date(value);
  }

  startDate = new Date();
  endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 jours par défaut
  currentTime = new Date();

  private intervalId?: number;

  progress = computed(() => {
    const start = this.startDate.getTime();
    const end = this.endDate.getTime();
    const current = this.currentTime.getTime();
    
    if (current <= start) return 0;
    if (current >= end) return 100;
    
    const total = end - start;
    const elapsed = current - start;
    
    return (elapsed / total) * 100;
  });

  timeRemaining = computed(() => {
    const end = this.endDate.getTime();
    const current = this.currentTime.getTime();
    
    if (current >= end) return 'Terminé!';
    
    const diff = end - current;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}j ${hours}h restantes`;
    if (hours > 0) return `${hours}h ${minutes}min restantes`;
    return `${minutes}min restantes`;
  });

  ngOnInit() {
    // Mise à jour toutes les secondes
    this.intervalId = window.setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
