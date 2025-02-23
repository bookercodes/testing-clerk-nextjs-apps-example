"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function ReviewForm () {
  const [ratingValue, setRatingValue] = useState("");
  const [reviewValue, setReviewValue] = useState("");

  const [ratingInputError, setRatingInputError] = useState<string | null>(null);
  const [reviewInputError, setReviewInputError] = useState<string | null>(null);

  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  function handleReviewChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setReviewValue(value);

    if (value.length >= 5) {
      setReviewInputError(null);
    } else {
      setReviewInputError("Review must be at least 5 characters");
    }
  }

  function handleRatingChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setRatingValue(value);

    if (parseInt(value) > 0) {
      setRatingInputError(null);
    } else {
      setRatingInputError("Rating must be a number above 0");
    }
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (parseInt(ratingValue) > 0 && reviewValue.length >= 5) {
      setSubmitMessage("Form submitted successfully!");
      setRatingValue("");
      setReviewValue("");
    } else {
      setSubmitMessage("Please fix the errors in the form!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-96 p-4 border border-black rounded-md"
    >
      <label
        htmlFor="review"
        className="flex flex-col"
      >
        Review
        <input
          className="border border-black"
          type="text"
          id="review"
          name="review"
          value={reviewValue}
          onChange={handleReviewChange}
        />
      </label>
      <label
        htmlFor="rating"
        className="flex flex-col"
      >
        Rating
        <input
          className="border border-black"
          type="number"
          id="rating"
          name="rating"
          value={ratingValue}
          onChange={handleRatingChange}
        />
      </label>
      {reviewInputError && (
        <div className="text-red-500">
          {reviewInputError}
        </div>
      )}
      {ratingInputError && (
        <div className="text-red-500">
          {ratingInputError}
        </div>
      )}
      {submitMessage &&
        <div className="text-red-500">
          {submitMessage}
        </div>
      }
      <button role="button" type="submit">Submit</button>
    </form>
  );
};

export default function Page () {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/dashboard");
    }
  }, [isLoaded, userId, router]);

  return (
    <div className="flex justify-center py-24">
      <h1
        className="flex flex-col gap-4 w-96 p-4 border border-black rounded-md"
      >
        Welcome to the Dog Friendly Restaurant Reviews form!
      </h1>
      <ReviewForm />
    </div>
  );
};