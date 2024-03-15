export default function UpdateProfile() {
  return (
    <div className="flex items-center justify-center py-5 px-4">
      <div className="bg-white shadow rounded-lg p-6 w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Update Profil</h2>
        <form>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Nama:
            <input
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Nama Anda"
            />
          </label>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Bio:
            <textarea
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              rows={3}
              placeholder="Bio Anda"
              defaultValue={""}
            />
          </label>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Gambar Profil:
            <input
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              type="file"
            />
          </label>
          <button className="w-full px-3 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-md focus:outline-none focus:shadow-outline hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
