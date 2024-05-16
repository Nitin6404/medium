const SubscriptionForm = () => {
  return (
    <form className="mt-2">
      <input type="email" placeholder="Your Email" className="px-4 py-2 w-full rounded-md" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Subscribe</button>
    </form>
  );
};

export default SubscriptionForm;
