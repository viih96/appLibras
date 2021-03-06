import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Medicament } from './medicament';
import { Attend } from './attend';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  // private medicamentCollection: AngularFirestoreCollection<Medicament>;

  // constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
  //   this.medicamentCollection = this.afs.collection<Medicament>('medicament')
  // }

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
  // getAll() { // buscar todos
  //   // return this.afs.collection('medicament', ref => ref.orderBy('name','asc'))
  //   return this.afs.collection('medicament')
  //     .snapshotChanges().pipe(
  //       map(changes => {
  //         return changes.map(s => {
  //           const id = s.payload.doc.id;
  //           const data = s.payload.doc.data() as Medicament
  //           return { id, ...data };
  //         })
  //       })
  //     )
  // }

  // getById(id: string) { // buscar por Id
  //   return this.medicamentCollection.doc<Medicament>(id).valueChanges();
  // }

  // addMedicament(medicament: Medicament) {
  //   const id = this.afs.createId();
  //   const { paciente, atendimento, remedio, tipo, dosagem, horario, observacao } = medicament;

  //   this.afs.collection('medicament').doc(id).set(
  //     {
  //       paciente: paciente,
  //       sus: atendimento,
  //       remedio: remedio,
  //       tipo: tipo,
  //       dosagem: dosagem,
  //       horario: horario,
  //       observacao: observacao,
  //     }
  //   );
  // }

  // updateMedicament(medicament: Medicament, id: string) {
  //   this.medicamentCollection.doc<Medicament>(id).update(Object.assign({}, medicament));
  // }

  // deleteSymptoms(id: string, filePath: string) {
  //   this.medicamentCollection.doc<Medicament>(id).delete();
  // }
}
