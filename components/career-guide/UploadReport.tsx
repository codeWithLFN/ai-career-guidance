import { analysePdfDocument } from "@/app/actions/actions";
import React, { useEffect, useState } from "react";
import { Progress } from "../app-components/ui/progress";
import LoadingIndicator from "../ui/loadingIndicator";
import { useDispatch } from "react-redux";
import { addAccademicRecord } from "@/lib/store/slices/academicSlice";
import { findValueByKey, testData } from "@/lib/utils";
import Disclaimer from "../ui/Disclaimer";

/**
 * Convert a File object to a Base64 string
 * @param file - The File object (from input or drag/drop)
 * @returns Promise<string> - Base64 encoded string
 */
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result as string;
            resolve(result); // remove "data:...;base64," prefix
        };

        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
    });
}

export const UploadReport: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [documentData, setDocumentData] = useState<any>()
    const dispatch = useDispatch();

    const handleFileUpload = async (e: any) => {
        setIsLoading(true);
        const file = e.target.files?.[0];
        setFile(file);
        if (file) {
            const encoded = await fileToBase64(file);
            //   console.log({encoded})
            const data = await analysePdfDocument(encoded);
            console.log({ newData: JSON.parse(data!) });
            setDocumentData(JSON.parse(data!))
            dispatch(addAccademicRecord(JSON.parse(data!)))
        }
        setIsLoading(false);
    }
    if (isLoading) {
        return <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" style={{ width: '450px', height: '100px' }}>
            <LoadingIndicator message={"Loading"} />
        </div>
    }

    const dataValues = findValueByKey(testData, 'modules');
    console.log({dataValues})
    return (
        <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" style={{ width: '450px' }}>
            <svg className="text-primary w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <div className="input_field flex flex-col w-max mx-auto text-center">
                <label>
                    <input className="text-sm cursor-pointer w-36 hidden" type="file" multiple
                        // onChange={(e) => setFile(e.target.files?.[0] || null)}
                        onChange={handleFileUpload}
                    />
                    <div className="text bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-gray-500 dark:text-gray-900">Select</div>
                </label>

                <div className="title text-primary uppercase">or drop files here</div>
            </div>
            {file && (
                <p className="mt-2 text-sm text-black dark:text-white">
                    Selected: {file.name}
                </p>
            )}

        </div>
    );
};
