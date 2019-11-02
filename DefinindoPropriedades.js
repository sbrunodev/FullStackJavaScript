objAluno1 = { turma: "Turma A" };
objAluno2 = { turma: "Turma B" };

Object.defineProperties(objAluno1,
    {
        nome: {
            value: "Bruno",
            enumerable: true,
            configurable: true,
            writable: true,
        }
    }
)

Object.defineProperties(objAluno2,
    {
        _nome: {
            value: "Bruno",
            enumerable: true,
            configurable: true,
            writable: true,
        },
        nome: {
            get: function () {
                return this._nome + " - " + this.turma;
            },
            set: function (value) {
                this._nome = value;
            }
        }
    }
)

console.log(objAluno1);
console.log(objAluno2);
console.log(objAluno2.nome);