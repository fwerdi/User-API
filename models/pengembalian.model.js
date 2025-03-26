const mongoose = require("mongoose");

const PengembalianSchema = new mongoose.Schema(
  {
    id_peminjaman: {
      type: mongoose.Schema.Types.String, // Relasi ke peminjaman
      ref: "Peminjaman",
      required: true,
    },
    tanggal_pengembalian: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Pengembalian = mongoose.model("Pengembalian", PengembalianSchema);
module.exports = Pengembalian;
