// src/app/standalone/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class FooterComponent {
  newsletterForm: FormGroup;
  subscribeSuccess = false;
  currentYear = new Date().getFullYear();

  // Social media links
  socialLinks = [
    { name: 'Facebook', icon: 'bi-facebook', url: 'https://facebook.com/' },
    { name: 'Instagram', icon: 'bi-instagram', url: 'https://instagram.com/' },
    { name: 'Twitter', icon: 'bi-twitter-x', url: 'https://twitter.com/' },
    { name: 'Pinterest', icon: 'bi-pinterest', url: 'https://pinterest.com/' }
  ];

  // Quick links
  quickLinks = [
    { name: 'About Us', url: '/about' },
    { name: 'Delivery Information', url: '/delivery' },
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms & Conditions', url: '/terms' },
    { name: 'FAQs', url: '/faqs' }
  ];

  // Categories
  categories = [
    { name: 'Bakery', url: '/products/category/bakery' },
    { name: 'Grocery', url: '/products/category/grocery' },
    { name: 'Fresh Produce', url: '/products/category/produce' },
    { name: 'Dairy', url: '/products/category/dairy' },
    { name: 'Organic', url: '/products/category/organic' }
  ];

  // Payment methods
  paymentMethods = [
    { name: 'Visa', icon: 'assets/images/payment/visa.svg' },
    { name: 'MasterCard', icon: 'assets/images/payment/mastercard.svg' },
    { name: 'PayPal', icon: 'assets/images/payment/paypal.svg' },
    { name: 'Apple Pay', icon: 'assets/images/payment/apple-pay.svg' },
    { name: 'Google Pay', icon: 'assets/images/payment/google-pay.svg' },
    { name: 'Mobile Money', icon: 'assets/images/payment/mobile-money.svg' }
  ];

  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitNewsletter(): void {
    if (this.newsletterForm.valid) {
      // Here you would typically call a service to subscribe the user
      console.log('Newsletter subscription:', this.newsletterForm.value);
      this.subscribeSuccess = true;
      this.newsletterForm.reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        this.subscribeSuccess = false;
      }, 5000);
    }
  }
}