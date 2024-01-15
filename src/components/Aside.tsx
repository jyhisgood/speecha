import { FiFolderPlus, FiFilePlus } from 'react-icons/fi';

type Props = {};

const Aside = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <button className="bg-black/10 py-3 rounded-lg flex justify-center items-center">
          <FiFilePlus size={18} />
        </button>
        <button className="bg-black/10 py-3 rounded-lg flex justify-center items-center">
          <FiFolderPlus size={18} />
        </button>
        <button className="bg-black/10 py-3 rounded-lg flex justify-center items-center">
          <FiFolderPlus size={18} />
        </button>
      </div>
      <ul>
        {Array(22)
          .fill(null)
          .map((_, idx) => (
            <li key={idx}>idx {idx + 1}</li>
          ))}
      </ul>
    </div>
  );
};

export default Aside;
