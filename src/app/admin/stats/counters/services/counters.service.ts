import { computed, Injectable, signal } from '@angular/core';
import { Counters } from '../models/counters.model';

@Injectable({
  providedIn: 'root'
})
export class CountersService {
  private readonly countersSignal = signal<Counters>({
    calls: this.getStoredCounters('calls'),
    cv: this.getStoredCounters('cv'),
    github: this.getStoredCounters('github'),
    linkedin: this.getStoredCounters('linkedin'),
    projects: this.getStoredCounters('projects'),
    websites: this.getStoredCounters('websites')
  });

  readonly getCalls = computed(() => this.countersSignal().calls);
  readonly getCv = computed(() => this.countersSignal().cv);
  readonly getGithub = computed(() => this.countersSignal().github);
  readonly getLinkedin = computed(() => this.countersSignal().linkedin);
  readonly getProjects = computed(() => this.countersSignal().projects);
  readonly getWebsites = computed(() => this.countersSignal().websites);

  readonly getAllCounters = computed(() => this.countersSignal());

  readonly getTotalCounters = computed(() => {
    const counters = this.countersSignal();
    return (
      counters.calls +
      counters.cv +
      counters.github +
      counters.linkedin +
      counters.projects +
      counters.websites
    );
  });

  incrementCalls() {
    this.incrementCounters('calls');
  }

  incrementCv() {
    this.incrementCounters('cv');
  }

  incrementGithub() {
    this.incrementCounters('github');
  }

  incrementLinkedin() {
    this.incrementCounters('linkedin');
  }

  incrementProjects() {
    this.incrementCounters('projects');
  }

  incrementWebsites() {
    this.incrementCounters('websites');
  }

  private incrementCounters(key: keyof Counters) {
    this.countersSignal.update((counters) => ({
      ...counters,
      [key]: counters[key] + 1
    }));
  }

  private getStoredCounters(key: keyof Counters) {
    const storedCounters = localStorage.getItem(key);
    return storedCounters ? parseInt(storedCounters) : 0;
  }

  private setStoredCounters(key: keyof Counters, value: number) {
    localStorage.setItem(key, value.toString());
  }
}
