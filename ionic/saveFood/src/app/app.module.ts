import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { RegcompletePage } from './regcomplete/regcomplete.page';
import { FoodDetailPage } from '../app/food-detail/food-detail.page';
import { UploadPage } from '../app/upload/upload.page';
import { RegcompletePageModule } from './regcomplete/regcomplete.module';
import { UploadPageModule } from './upload/upload.module';
import { FoodDetailPageModule } from './food-detail/food-detail.module';
import { Camera } from '@ionic-native/camera/ngx';
@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    RegcompletePage,
    FoodDetailPage,
    UploadPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialization for Firebase Connection
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    RegcompletePageModule,
    UploadPageModule,
    FoodDetailPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
