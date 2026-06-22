export default function TweetPage({ params }: any) {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-xl font-bold">Tweet Details Page</h1>
      <p>Tweet ID: {params.id}</p>
    </div>
  );
}