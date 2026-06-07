import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "./_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function CreateTransactionPage({ searchParams }) {
  const { edit } = await searchParams;
  const accounts = await getUserAccounts();

  let initialData = null;
  if (edit) {
    initialData = await getTransaction(edit);
  }

  return (
    <div className="max-w-3xl mx-auto px-5 pb-20">
      <h1 className="text-5xl gradient-title mb-8">
        {edit ? "Edit Transaction" : "Add Transaction"}
      </h1>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!edit}
        initialData={initialData}
      />
    </div>
  );
}