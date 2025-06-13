import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
  hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
  getAllKeys(): string[] {
    return Object.keys(localStorage);
  }
  getAllItems(): { [key: string]: any } {
    const items: { [key: string]: any } = {};
    this.getAllKeys().forEach((key) => {
      items[key] = this.getItem(key);
    });
    return items;
  }
  getItemAsString(key: string): string | null {
    return localStorage.getItem(key);
  }
  getItemAsNumber(key: string): number | null {
    const value = this.getItem(key);
    return typeof value === 'number' ? value : null;
  }
  getItemAsBoolean(key: string): boolean | null {
    const value = this.getItem(key);
    return typeof value === 'boolean' ? value : null;
  }
}
