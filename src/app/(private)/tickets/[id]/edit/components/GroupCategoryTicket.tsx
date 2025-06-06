export default function GroupCategoryTicket({
    children, namegroup
}: Readonly<{
    children: React.ReactNode;
    namegroup: string
}>) {

    return (
        <div className="border-2 border-gray-300 rounded-xl relative p-8 mt-4 flex gap-3 flex-col">
            <h3 className="text-gray-600 absolute top-[-12px] bg-white pl-3 pr-3 text-sm font-semibold">{namegroup}</h3>
            {children}
        </div>)
}