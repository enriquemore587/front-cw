import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MainTrackingComponent } from './components/main-tracking/main-tracking.component';

const TrackingRoutes: Routes = [
    {
        path: 'tracking',
        component: MainTrackingComponent,
        children: [
            { path: '', redirectTo: 'consult', pathMatch: 'full' },
            { path: 'consult', component : MainTrackingComponent}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(TrackingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ModuleTrackingRouting{
}
