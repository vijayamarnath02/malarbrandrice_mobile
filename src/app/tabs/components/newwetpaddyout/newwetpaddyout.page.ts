import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-newwetpaddyout',
  templateUrl: './newwetpaddyout.page.html',
  styleUrls: ['./newwetpaddyout.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class NewwetpaddyoutPage implements OnInit {
  wetpaddyOutForm!: FormGroup;
  itemList: any[] = [];
  recordId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private malarService: MalarService
  ) { }

  ngOnInit() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    this.wetpaddyOutForm = this.fb.group({
      date: [formattedDate, Validators.required],
      item: ['', Validators.required],
      driedAt: [''],
      deliveryAt: [''],
      moisture: ['', Validators.required],
      bags: ['', Validators.required],
      weight: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.recordId = this.route.snapshot.paramMap.get('id');
    this.loadDropdowns();

    if (this.recordId) {
      this.loadWetPaddyOutDetails(this.recordId);
    }
  }

  loadDropdowns() {
    this.malarService.getItems().subscribe({
      next: (res) => (this.itemList = res),
      error: (err) => console.error('Items load failed', err),
    });
  }

  loadWetPaddyOutDetails(id: string) {
    this.malarService.getWetPaddyOutById(id).subscribe({
      next: (data) => {
        this.wetpaddyOutForm.patchValue({
          date: data.date,
          item: data.item_id,
          driedAt: data.dried_at,
          deliveryAt: data.delivery_at,
          moisture: data.moisture,
          bags: data.bags,
          weight: data.weight,
          vehicleNumber: data.vehicle_number,
        });
      },
      error: (err) => console.error('Load failed', err),
    });
  }

  onSubmit() {
    if (this.wetpaddyOutForm.invalid) {
      this.wetpaddyOutForm.markAllAsTouched();
      return;
    }

    const payload = {
      date: this.wetpaddyOutForm.value.date,
      item_id: this.wetpaddyOutForm.value.itemId,
      dried_at: this.wetpaddyOutForm.value.driedAt,
      delivery_at: this.wetpaddyOutForm.value.deliveryAt,
      moisture: +this.wetpaddyOutForm.value.moisture,
      bags: +this.wetpaddyOutForm.value.bags,
      weight: +this.wetpaddyOutForm.value.weight,
      vehicle_number: this.wetpaddyOutForm.value.vehicleNumber,
    };

    if (this.recordId) {
      this.malarService.updateWetPaddyOut(this.recordId, payload).subscribe({
        next: () => this.router.navigate(['/tabs/dashboard']),
        error: (err) => console.error('Update failed', err),
      });
    } else {
      this.malarService.createWetPaddyOut(payload).subscribe({
        next: () => this.router.navigate(['/tabs/dashboard']),
        error: (err) => console.error('Create failed', err),
      });
    }
  }

  onCancel() {
    this.wetpaddyOutForm.reset();
    this.router.navigate(['/tabs/dashboard']);
  }
}
