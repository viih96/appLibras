
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Attend } from './attend';
import { Medicament } from './medicament';


@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  private attendCollection: AngularFirestoreCollection<Attend>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.attendCollection = this.afs.collection<Attend>('attend');
  }

  getByUserAttend(idUser: string) {
    return this.afs.collection('attend', ref => ref.where('uId', '==', idUser))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(s => {
            const id = s.payload.doc.id;
            const data = s.payload.doc.data() as Attend
            return { id, ...data };
          })
        })
      )
  }


 getAllSubMedicament(id: string) {
  return this.afs.collection('attend').doc(id).collection('subMedicament')
    .snapshotChanges().pipe(
      map(changes => {
        return changes.map(s => {
          const id = s.payload.doc.id;
          const data = s.payload.doc.data() as Medicament
          return { id, ...data };
        })
      })
    )
}

}
