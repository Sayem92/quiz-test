const Question = ({ q, selectedOptions, handleOptionChange, submitted }) => {
  const { description, options } = q;

  return (
    <div className="p-6 shadow-md border border-white  m-2 md:my-4 rounded-lg ">
      <h2 className="text-lg font-semibold mb-4">{description}</h2>
      <div className="flex flex-col gap-2">
        {options?.map((option) => (
          <label key={option?.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={option?.description}
              checked={selectedOptions?.includes(option?.id)}
              onChange={() => handleOptionChange(q?.id, option?.id)}
              className="w-4 h-4"
              disabled={submitted} // ✅ Disables checkboxes after submit
            />
            <span>{option.description}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
