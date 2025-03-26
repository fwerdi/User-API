const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    no_induk: {
      type: String,
      required: [true, "Please enter Nomor Induk "],
    },

    tanggal_pembukuan: {
      type: String,
      required: true,
      default: 0,
    },

    no_klas: {
      type: Number,
      required: true,
      default: 0,
    },

    judul: {
      type: String,
      required: true,
      default: 0,
    },

    eks: {
      type: Number,
      required: true,
      default: 0,
    },

    penggarang: {
      type: String,
      required: true,
      default: 0,
    },

    penerbit: {
      type: String,
      required: true,
      default: 0, 
    },

    kota_terbit: {
      type: String,
      required: true,
      default: 0, 
    },

    tanggal_penyerahan: {
      type: String,
      required: true,
      default: 0, 
    },

    keadaan_buku: {
      type: String,
      required: true,
      default: 0, 
    },

    harga_satuan: {
      type: String,
      required: true,
      default: 0, 
    },

    asal_terima: {
      type: String,
      required: true,
      default: 0, 
    },

    status: {
      type: Boolean,
      required: true,
      default: 0, 
    },

    keterangan: {
      type: String,
      required: true,
      default: 0, 
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
