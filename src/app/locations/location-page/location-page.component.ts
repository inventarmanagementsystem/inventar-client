import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmPopup} from "primeng/confirmpopup";
import {MessageService} from "primeng/api";
import {LocationStateService} from "../services/location-state.service";
import {CreateLocationRequest} from "../models/create-location-request.model";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../utility/services/local-storage.service";

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html'
})
export class LocationPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  createForm: FormGroup = new FormGroup({})
  deleteForm: FormGroup = new FormGroup({})
  error: string | null = null;
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private router: Router,
    private messageService: MessageService,
    public locationState: LocationStateService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(){
    this.subscriptions.add(
      this.getAllLocations()
    )

    this.initializeForms();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private initializeForms(){
    const savedCreateForm = this.localStorageService.loadCreateLocationRequest();
    const savedDeleteForm = this.localStorageService.loadDeleteLocationRequest();

    this.createForm = new FormGroup({
      code: new FormControl(savedCreateForm.code, [
        Validators.required
      ])
    }, { updateOn: 'change' });

    this.deleteForm = new FormGroup({
      code: new FormControl(savedDeleteForm, [
        Validators.required
      ])
    });

    this.createForm.valueChanges.subscribe(() => {
      this.localStorageService.saveCreateLocationRequest(this.createForm.value);
    });

    this.deleteForm.valueChanges.subscribe(() => {
      this.localStorageService.saveDeleteLocationRequest(this.deleteForm.get("code")!.value);
    });
  }

  private getAllLocations(): Subscription{
    return this.locationState.getLocations()
      .pipe(
        map(locations => locations.sort((a, b) => a.code.localeCompare(b.code)))
      )
      .subscribe({
        next:(locations)=>{
          this.locationState.setLocations(locations)
        },
        error:(error)=>{
          this.locationState.setError(error)
        },
        complete:() => {
          this.locationState.setLoading(false)
        }
      })
  }

  copyCodeToClipboard(code: string) {
    navigator.clipboard.writeText(code.toString())
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Code ${code} copied to clipboard` });
  }

  createLocation() {
    let request: CreateLocationRequest = {
      code: this.createForm.value.code as string
    };

    this.locationState.createLocation(request)
    this.initializeForms()
  }

  deleteLocation() {
    let code = this.deleteForm.value.code
    this.locationState.deleteLocation(code)
  }

  checkArticles(code: string) {
    this.router.navigate(['/article-locations'], { queryParams: { locationCode: code } });
  }
}
