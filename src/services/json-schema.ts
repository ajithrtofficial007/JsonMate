import Ajv from "ajv";
import generateSchema from 'json-schema-generator';

export class JsonSchema {
    json: object = {};
    jsonSchema: object = {};
    ajv = new Ajv();

    generateSchemaFromInput(jsonInput: string): string {
        if (jsonInput.trim() !== "") {
            let generatedSchema: object = {};
            try {
                generatedSchema = generateSchema(JSON.parse(jsonInput));
            } catch (error) {
                console.log('Invalid json')
            }
            return JSON.stringify(generatedSchema, null, 2);
        }
        else
            return "";
    }

    validateJson(jsonInput: object, jsonSchema: object): any {
        let validate = this.ajv.compile(jsonSchema);
        return validate(jsonInput);
    }
}