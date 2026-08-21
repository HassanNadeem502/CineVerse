const TrailerModal = ({ isOpen, onClose, trailerKey }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/80
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-zinc-900
          rounded-2xl
          p-8
          w-[800px]
          max-w-[95%]
        "
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Movie Trailer</h2>

          <button
            onClick={onClose}
            className="
              text-white
              text-3xl
            "
          >
            ✕
          </button>
        </div>

        <iframe
          className="w-full h-[450px] rounded-xl"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
