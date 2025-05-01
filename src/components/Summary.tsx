interface PropsSummary {
  totaldays: number;
}

export function Summary({ totaldays }: PropsSummary) {
  return (
    <div className="card">
      <p>You will spend {totaldays} days to watch all the videos</p>
    </div>
  );
}
