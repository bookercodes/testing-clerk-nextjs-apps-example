import { render, screen, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import SubmitReviewPage from "../app/submit-review/page";
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider/next-13.5";
import { userEvent } from "@testing-library/user-event";

// Here, we mock the ClerkProvider and useAuth functions from the Clerk SDK.
// Since those have their own tests and also add complexity to test set-up,
// we can simply mock them to simplify our tests.
// We also mock the SignIn component from the Clerk SDK, as we don't need to test it here.
jest.mock('@clerk/nextjs', () => {
  const originalModule = jest.requireActual('@clerk/nextjs');
  return {
    ...originalModule,
    useAuth: jest.fn(() => ({ userId: null })),
    SignIn: () => <div data-testid="clerk-sign-in">Sign In Component</div>,
    ClerkProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>
  };
});

const TestProviders = ({ isLoggedIn = false, children }: { isLoggedIn?: boolean, children: ReactNode }) => {
  (useAuth as jest.Mock).mockReturnValue({ userId: isLoggedIn ? 'user-id' : null });

  // Here, we wrap our component in the ClerkProvider and MemoryRouterProvider to provide the necessary context for our tests.
  // MemoryRouterProvider is used to mock the Next.js router,
  // which is necessary for testing components that use the router.
  return (
    <MemoryRouterProvider>
      <ClerkProvider>
         {children}
      </ClerkProvider>
    </MemoryRouterProvider>
    );
  };
  
const renderWithProviders = (ui: ReactNode, isLoggedIn?: boolean) => {
  return render(<TestProviders isLoggedIn={isLoggedIn}>{ui}</TestProviders>);
};

describe("Submit Review Page", () => {
  describe("When a user is unauthenticated" , () => {
    const isLoggedIn = false;

    it("redirects them to sign in when they try to access the review submission page", async () => {
      renderWithProviders(
        <SubmitReviewPage />,
        isLoggedIn,
      );

      // Use waitFor when you need to wait for elements to asynchronously appear on the page.
      waitFor(() => {
        expect(screen.getByTestId("clerk-sign-in")).toBeInTheDocument();
       }, { timeout: 5000 });

       waitFor(() => {
        expect(screen.queryByText("Review how dog-friendly this restaurant is!")).not.toBeInTheDocument();
       }, { timeout: 5000 });
    });
  });

  describe("When a user is authenticated", () => {
    const isLoggedIn = true;

    it("allows them to submit a review successfully", async () => {
      const user = userEvent.setup();

      renderWithProviders(
        <SubmitReviewPage />,
        isLoggedIn,
      );

      expect(await screen.findByText("Welcome to the Dog Friendly Restaurant Reviews form!")).toBeInTheDocument();      

      expect(screen.queryByTestId("clerk-sign-in")).not.toBeInTheDocument();

      const reviewInput = await screen.findByRole('textbox', {
        name: /review/i
      });
      const ratingInput = await screen.findByRole('spinbutton', { 
        name: /rating/i
      });

      await user.click(reviewInput);
      await user.type(reviewInput, "Great place!");
      await user.click(ratingInput);
      await user.type(ratingInput, "5");
      
      await user.click(screen.getByText("Submit"));

      // expect the form to be cleared
      expect(screen.getByLabelText("Review")).toHaveValue("");
      expect(screen.getByLabelText("Rating")).toHaveValue;

      // expect a success toast
      expect(await screen.findByText("Form submitted successfully!")).toBeInTheDocument();
    });

    it("displays error messages when the user adds a rating that is less than 0", async () => {
      const user = userEvent.setup();

      renderWithProviders(
        <SubmitReviewPage />,
        isLoggedIn,
      );

      expect(await screen.findByText("Welcome to the Dog Friendly Restaurant Reviews form!")).toBeInTheDocument();      

      expect(screen.queryByTestId("clerk-sign-in")).not.toBeInTheDocument();

      // Note the use of findByRole, as well as async/await. Role lookup is based on the role attribute, which is used to describe the purpose of an element.
      // This is useful for accessibility.
      const reviewInput = await screen.findByRole('textbox', {
        name: /review/i
      });
      const ratingInput = await screen.findByRole('spinbutton', { // Note: can also find by Label!
        name: /rating/i
      });

      await user.click(reviewInput);
      await user.type(reviewInput, "Great place!");
      await user.click(ratingInput);
      await user.type(ratingInput, "-1");
      
      await user.click(screen.getByText("Submit"));

      // Note the use of getByLabelText to find the input field by its label text, which helps with accessibility.
      expect(screen.getByLabelText("Review")).toHaveValue("Great place!");
      expect(screen.getByLabelText("Rating")).toHaveValue(-1);

      // expect an error message
      expect(await screen.findByText("Please fix the errors in the form!")).toBeInTheDocument();
    });

    it("displays error messages when the user adds a review that is less than 5 characters", async () => {
      const user = userEvent.setup();

      renderWithProviders(
        <SubmitReviewPage />,
        isLoggedIn,
      );

      // Note here the user of findByText based on the page's text content as viewed by the user.
      expect(await screen.findByText("Welcome to the Dog Friendly Restaurant Reviews form!")).toBeInTheDocument();      

      // Note the use of queryByTestId to check for non-existence.  
      expect(screen.queryByTestId("clerk-sign-in")).not.toBeInTheDocument();

      // Note the use of findByRole, as well as async/await.
      const reviewInput = await screen.findByRole('textbox', {
        name: /review/i
      });
      const ratingInput = await screen.findByRole('spinbutton', { // Note: can also find by Label!
        name: /rating/i
      });

      await user.click(reviewInput);
      await user.type(reviewInput, "ok");
      await user.click(ratingInput);
      await user.type(ratingInput, "5");
      
      await user.click(screen.getByText("Submit"));

      // Expect the form to be cleared
      expect(screen.getByLabelText("Review")).toHaveValue("ok");
      expect(screen.getByLabelText("Rating")).toHaveValue(5);

      // Expect an error message
      expect(await screen.findByText("Please fix the errors in the form!")).toBeInTheDocument();
    });
  });
});
