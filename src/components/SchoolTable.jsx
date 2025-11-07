function SchoolTable({ schools }) {
  return (
    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Phase</th>
          <th className="p-3 text-left">Municipality</th>
          <th className="p-3 text-left">Capacity</th>
          <th className="p-3 text-left">Enrolment</th>
          <th className="p-3 text-left">Utilisation</th>
          <th className="p-3 text-left">Condition</th>
        </tr>
      </thead>
      <tbody>
        {schools.map((school) => (
          <tr key={school.id} className="border-b hover:bg-gray-50">
            <td className="p-3">{school.name}</td>
            <td className="p-3">{school.phase}</td>
            <td className="p-3">{school.municipality}</td>
            <td className="p-3">{school.capacity}</td>
            <td className="p-3">{school.enrolment}</td>
            <td className="p-3">{school.utilisation}</td>
            <td className="p-3">{school.condition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SchoolTable;
