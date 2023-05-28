
import useSmoothHorizontalScroll from "use-smooth-horizontal-scroll";

const Scrool = () => {
  const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } =
    useSmoothHorizontalScroll();

  return (
    <div>
      <button onClick={() => scrollTo(-100)} disabled={isAtStart}>
        Scroll Left
      </button>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={{ overflowX: "scroll" }}
      >
        <h1>Hello</h1>
      </div>
      <button onClick={() => scrollTo(100)} disabled={isAtEnd}>
        Scroll Right
      </button>
    </div>
  );
};

export default Scrool;
