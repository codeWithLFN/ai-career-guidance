import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const testData = {
  "pages": [
    {
      "page_number": 1,
      "content": {
        "student_information": {
          "student_number": "13013786",
          "surname": "Zietsman",
          "first_names": "Grant Eugene",
          "date_of_birth": "1994-06-03",
          "type_of_exemption": "Admit to Bachelor's Degree",
          "date_issued": "2016-12-02"
        },
        "academic_record": [
          {
            "term": "2015",
            "program": "BEng",
            "plan": "Computer Engineering",
            "modules": [
              {
                "module_code": "BSS310",
                "module_name": "Engineering management 310",
                "credits": 8.00,
                "percentage": 67,
                "results": "Pass"
              },
              {
                "module_code": "MIA320",
                "module_name": "Engineering activity and group work 320",
                "credits": 8.00,
                "percentage": 71,
                "results": "Pass"
              },
              {
                "module_code": "EBB320",
                "module_name": "Control systems 320",
                "credits": 16.00,
                "percentage": 59,
                "results": "Pass"
              },
              {
                "module_code": "EIW320",
                "module_name": "Information technology practice 320",
                "credits": 8.00,
                "percentage": 997,
                "results": "Attendance satisfactory"
              },
              {
                "module_code": "EME310",
                "module_name": "Electromagnetic compatibility 310",
                "credits": 16.00,
                "percentage": 78,
                "results": "Pass with distinction"
              },
              {
                "module_code": "EMK310",
                "module_name": "Microprocessors 310",
                "credits": 16.00,
                "percentage": 73,
                "results": "Pass"
              },
              {
                "module_code": "ENE310",
                "module_name": "Analogue electronics 310",
                "credits": 16.00,
                "percentage": 71,
                "results": "Pass"
              },
              {
                "module_code": "EPE321",
                "module_name": "Software engineering 321",
                "credits": 16.00,
                "percentage": 73,
                "results": "Pass"
              },
              {
                "module_code": "ERD320",
                "module_name": "Computer engineering design 320",
                "credits": 16.00,
                "percentage": 78,
                "results": "Pass with distinction"
              },
              {
                "module_code": "EAI320",
                "module_name": "Intelligent systems 320",
                "credits": 16.00,
                "percentage": 70,
                "results": "Pass"
              },
              {
                "module_code": "EDC310",
                "module_name": "Digital communication 310",
                "credits": 16.00,
                "percentage": 51,
                "results": "Pass"
              }
            ],
            "weighted_average_for_term": 69.11,
            "cumulative_weighted_average": 76.24,
            "outcome": "Permitted to proceed"
          },
          {
            "term": "2016",
            "program": "BEng",
            "plan": "Computer Engineering",
            "modules": [
              {
                "module_code": "IPI410",
                "module_name": "Engineering professionalism 410",
                "credits": 8.00,
                "percentage": 69,
                "results": "Pass"
              },
              {
                "module_code": "EPY423",
                "module_name": "Practical training and report 423",
                "credits": 16.00,
                "percentage": 997,
                "results": "Attendance satisfactory"
              },
              {
                "module_code": "ERP420",
                "module_name": "Specialisation 420",
                "credits": 16.00,
                "percentage": 88,
                "results": "Pass with distinction"
              },
              {
                "module_code": "EAS410",
                "module_name": "Computer engineering: Architecture and systems 410",
                "credits": 16.00,
                "percentage": 76,
                "results": "Pass with distinction"
              },
              {
                "module_code": "EHN410",
                "module_name": "e-Business and network security 410",
                "credits": 16.00,
                "percentage": 62,
                "results": "Pass"
              },
              {
                "module_code": "EPR402",
                "module_name": "Project 402",
                "credits": 64.00,
                "percentage": 77,
                "results": "Pass with distinction"
              },
              {
                "module_code": "ESP411",
                "module_name": "DSP programming and application 411",
                "credits": 16.00,
                "percentage": 68,
                "results": "Pass"
              }
            ],
            "weighted_average_for_term": 74.88,
            "cumulative_weighted_average": 75.92,
            "outcome": "Permitted to proceed"
          }
        ],
        "report_end_indicator": "***END OF REPORT***",
        "page_footer": {
          "page_number_text": "Page 2 of 2",
          "registrar_signature_text": "MyBurgh for REGISTRAR",
          "contact_information": {
            "university_name_afrikaans": "Universiteit van Pretoria",
            "university_name_english": "University of Pretoria",
            "address_afrikaans": "Privaatsak X20 / Private Bag X20",
            "address_city_postal_code": "Hatfield 0028",
            "email_afrikaans": "E-pos/Email: csc@up.ac.za",
            "phone": "Tel: 012 420 3111",
            "fax": "Faks/Fax 012 420 4555"
          }
        }
      }
    }
  ]
};

/**
 * Recursively searches for a key in a nested object or array.
 * @param obj The object or array to search.
 * @param targetKey The key name to look for.
 * @returns The value of the found key, or null if not found.
 */
export function findValueByKey(obj: any, targetKey: string): any {
  // If the current object has the key, return its value
  if (obj && typeof obj === 'object' && targetKey in obj) {
    return obj[targetKey];
  }

  // If it's an object, iterate through its properties
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const result = findValueByKey(obj[key], targetKey);
        if (result !== null) return result;
      }
    }
  }

  // If it's an array, iterate through its elements
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = findValueByKey(item, targetKey);
      if (result !== null) return result;
    }
  }

  return null;
}

/**
 * Create a new list of objects based on a required structure
 * by picking matching keys from unknown objects.
 *
 * @param data - List of unknown objects
 * @param structure - Object with required structure (keys to normalize)
 * @returns New list of objects matching the required structure
 */
export function normalizeObjects<T extends Record<string, any>>(
  data: Record<string, any>[],
  structure: T
): T[] {

  return data && data.map((obj) => {
    const newObj: any = {};

    for (const requiredKey of Object.keys(structure)) {
      // Look for a key in obj that contains the same keyword
      const matchKey = Object.keys(obj).find((k) =>
        k.toLowerCase().includes(requiredKey.toLowerCase())
      );

      if (matchKey) {
        newObj[requiredKey] = obj[matchKey];
      } 
      else {
        newObj[requiredKey] = null; // fallback if no match
      }
    }

    return newObj as T;
  });
}

// const dataArr = [
//   {
//     id: 1,
//     module_name: 'Technology',
//     percentage: 56,
//     mid: 23
//   },
//   {
//     id: 2,
//     module_name: 'Social',
//     percentage: 90,
//     mid: 23
//   },
//   {
//     id: 3,
//     module_name: 'Maths',
//     percentage: 80,
//     mid: 23
//   }
// ]

// const expectedObjects = {
//   percentage: 1,
//   name: 'tech'
// }
// const results = normalizeObjects(dataArr, expectedObjects);
// console.log({results});


