import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useState } from 'react';

const MotionPage: React.FC = () => {
  let accelHandler: PluginListenerHandle;
  let orientationHandler: PluginListenerHandle;
  const [showPermButton, setShowPermButton] = useState(false);

  useIonViewDidEnter(() => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      setShowPermButton(true);
    }
  });

  const listenOrientation = () => {
    orientationHandler = Motion.addListener('orientation', event => {
      console.log('orientation', event);
    });
  };

  const listenAcceleration = () => {
    accelHandler = Motion.addListener('accel', event => {
      console.log('accel', event);
    });
  };

  const stopAcceleration = () => {
    if (accelHandler) {
      accelHandler.remove();
    }
  };

  const stopOrientation = () => {
    if (orientationHandler) {
      orientationHandler.remove();
    }
  };

  const requestPermission = async () => {
    try {
      const result = await DeviceMotionEvent.requestPermission();
      if (result === 'granted') {
        setShowPermButton(false);
      } else {
        alert(`don't have permissions to listen`);
      }
    } catch (e) {
      alert('error requesting permssion');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Motion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {showPermButton ? (
            <IonItem>
              <IonLabel>iOS 13 Permission</IonLabel>
              <IonButton expand="block" onClick={requestPermission}>
                Request Motion Permission
              </IonButton>
            </IonItem>
          ) : (
            [
              <IonItem>
                <IonLabel>Orientation</IonLabel>
                <IonButton expand="block" onClick={listenOrientation}>
                  Listen Orientation
                </IonButton>
                <IonButton expand="block" onClick={stopOrientation}>
                  Stop Orientation
                </IonButton>
              </IonItem>,
              <IonItem>
                <IonLabel>Acceleration</IonLabel>
                <IonButton expand="block" onClick={listenAcceleration}>
                  Listen Acceleration
                </IonButton>
                <IonButton expand="block" onClick={stopAcceleration}>
                  Stop Acceleration
                </IonButton>
              </IonItem>,
            ]
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MotionPage;
