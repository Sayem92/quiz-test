const Answers = ({ q }) => {
  return (
    <div className="m-2 p-4 my-6 text-white bg-gray-600 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{q?.description}</h2>
      <ul>
        {q?.options?.map((option) => (
          <li
            key={option.id}
            className={`p-4 m-1 text-black rounded-md ${
              option.is_correct ? "bg-green-400" : "bg-gray-400"
            }`}
          >
            {option.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Answers;
