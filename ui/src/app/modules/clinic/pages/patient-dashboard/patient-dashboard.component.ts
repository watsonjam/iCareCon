import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';

import { loadFormPrivilegesConfigs } from 'src/app/store/actions/form-privileges-configs.actions';
import {
  getFormPrivilegesConfigs,
  getFormPrivilegesConfigsLoadingState,
} from 'src/app/store/selectors/form-privileges-configs.selectors';
import {
  getCurrentUserDetails,
  getCurrentUserPrivileges,
  getRolesLoadingState,
} from 'src/app/store/selectors/current-user.selectors';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { loadActiveVisit } from 'src/app/store/actions/visit.actions';
import { loadCurrentPatient, loadRolesDetails } from 'src/app/store/actions';
import { loadPatientBills } from 'src/app/store/actions/bill.actions';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
})
export class PatientDashboardComponent implements OnInit {
  privilegesConfigs$: Observable<any>;
  formPrivilegesConfigsLoadingState$: Observable<boolean>;
  currentUser$: Observable<any>;
  userPrivileges$: Observable<any>;
  rolesLoadingState$: Observable<boolean>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const patientId = this.route.snapshot.params['patientID'];
    this.store.dispatch(loadFormPrivilegesConfigs());
    this.store.dispatch(loadRolesDetails());
    // this.store.dispatch(loadActiveVisit({ patientId }));
    this.store.dispatch(loadCurrentPatient({ uuid: patientId }));
    this.privilegesConfigs$ = this.store.select(getFormPrivilegesConfigs);
    this.formPrivilegesConfigsLoadingState$ = this.store.select(
      getFormPrivilegesConfigsLoadingState
    );
    this.currentUser$ = this.store.select(getCurrentUserDetails);
    this.userPrivileges$ = this.store.select(getCurrentUserPrivileges);
    this.rolesLoadingState$ = this.store.select(getRolesLoadingState);
  }
}