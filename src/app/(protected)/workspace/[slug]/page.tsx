async function Workspace({ params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
  console.log("SLUG ", slug);
  return <div>Welcome to your workspace {slug}</div>;
}

export default Workspace;
