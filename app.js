const firebaseConfig = {
    apiKey: "---------------------",
    authDomain: "---------------------",
    databaseURL: "---------------------",
    projectId: "---------------------",
    storageBucket: "---------------------",
    messagingSenderId: "---------------------",
    appId: "---------------------",
    measurementId: "---------------------"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Variable global
let database = firebase.database();
let nama     = document.getElementById('nama');
let nohp     = document.getElementById('nohp');
let tbody    = document.getElementById('tbody');
let editnama = document.getElementById('editnama');
let editnohp = document.getElementById('editnohp');
let key      = document.getElementById('key');

/**
 * Create data
 * @return void
*/
function createData() {
    let data = {
        nama:  nama.value,
        nohp:  nohp.value
    }
    database.ref('bukutelepon').push(data);
    nama.value = '';
    nohp.value = '';
}

/**
 * List data
 * @param object snapshoot
 * @return void
*/
database.ref('bukutelepon').on('value', listData)
function listData(snapshoot) { 
    let table = '';
    let no = 1;
    snapshoot.forEach((data, key) => {
        let val = data.val();
        table += `
            <tr>
                <td scope="row">${no}</td>
                <td>${val.nama}</td>
                <td>${val.nohp}</td>
                <td>
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#edit-data" onclick="editData('${data.key}')">
                        Edit
                    </button>
                    <button type="button" class="btn btn-danger" onclick="deleteData('${data.key}')">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
        no++
    })
    tbody.innerHTML = table
}

/**
 * Retreive data
 * @param string id
 * @return void
*/
function editData(id) {
    database.ref(`bukutelepon/${id}`).on('value', function(snapshoot){
        let data = snapshoot.val()
        editnama.value = data.nama
        editnohp.value = data.nohp
        key.value = id
    })
}

/**
 * Update data
 * @return void
*/
function updateData() {
    let updateData = document.getElementById('updateData');
    let data       = {
        nama:  editnama.value,
        nohp:  editnohp.value
    }
    database.ref(`bukutelepon/${key.value}`).update(data);
    updateData.setAttribute('data-dismiss','modal')
}

/**
 * Delete data
  * @param string id
 * @return void
*/
function deleteData(id) {
    let valid = confirm('Apa kamu yakin ingin hapus data ini?');
    if(valid){
        database.ref(`bukutelepon/${id}`).remove();
    }
}