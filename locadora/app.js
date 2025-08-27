class Locadora{
	constructor(nome_completo,cpf,rua,numero,cep,telefone,celular,email,dia,mes,ano,ativo){
		this.nome_completo=nome_completo
		this.cpf=cpf
		this.rua=rua
		this.numero=numero
		this.cep=cep
		this.telefone=telefone
		this.celular=celular
		this.email=email
		this.dia = dia
		this.mes = mes
		this.ano = ano
		this.ativo = ativo
	}
	validarDados(){
		for(let i in this){
			if(this[i] == undefined || this[i] == ''|| this[i] == null){
				console.log(i)
				alert('preencha '+i)
				return false
			}
		}
		return true
	}
}
class Bd{
	constructor(){
		let id = localStorage.getItem('id')
		if(id===null){
			localStorage.setItem('id',0)
		}
	}
	getProximoId(){
		let proximoId = localStorage.getItem('id')//null//recuperar dado
		return parseInt(proximoId)+1
	}
	gravar(d){
		let id = this.getProximoId()
		localStorage.setItem(id,JSON.stringify(d))
		localStorage.setItem('id',id)
	}
	desativar(d,id){ 
		localStorage.setItem(id,JSON.stringify(d))
		let id2 = localStorage.getItem('id')
		localStorage.setItem('id',id2)
	}
	recuperarTodosRegistros(){
		let pessoas=Array()
		let id = localStorage.getItem('id')
		for(let i=1; i<=id;i++){
			let pessoa = JSON.parse(localStorage.getItem(i))
			if(pessoa===null){
				continue
			}
			pessoa.id=i
			pessoas.push(pessoa)
		}
		return pessoas
	}
	pesquisar(pessoa){
		
		let pessoasFiltradas = Array()
		pessoasFiltradas=this.recuperarTodosRegistros()
		console.log(pessoasFiltradas);
		console.log(pessoa)
		
		if (pessoa.nome_completo !=''){
			console.log('filtro de nome');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.nome_completo==pessoa.nome_completo)
		}
		if (pessoa.cpf !=''){
			console.log('filtro de cpf');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.cpf==pessoa.cpf)
		}
		if (pessoa.rua !=''){
			console.log('filtro de rua');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.rua==pessoa.rua)
		}
		if (pessoa.numero!=''){
			console.log('filtro de numero');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.numero==pessoa.numero)
		}
		if (pessoa.cep !=''){
			console.log('filtro de cep');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.cep==pessoa.cep)
		}
		if (pessoa.telefone !=''){
			console.log('filtro de telefone');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.telefone==pessoa.telefone)
		}
		if (pessoa.celular !=''){
			console.log('filtro de celular');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.celular==pessoa.celular)
		}
		if (pessoa.email !=''){
			console.log('filtro de email');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.email==pessoa.email)
		}

		if (pessoa.dia !=''){
			console.log('filtro de dia');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.dia==pessoa.dia)
		}
		if (pessoa.mes !=''){
			console.log('filtro de mes');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.mes==pessoa.mes)
		}
		if (pessoa.ano !=''){
			console.log('filtro de ano');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.ano==pessoa.ano)
		}
		
		if (pessoa.ativo !=''){
			console.log('filtro de ativo');
			pessoasFiltradas=pessoasFiltradas.filter(d=>d.ativo==pessoa.ativo)
		}
		return pessoasFiltradas
	}
	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()

function cadastrar(){

	let nome_completo = document.getElementById('nome_completo')
	let cpf = document.getElementById('cpf')
	let rua = document.getElementById('rua')
	let numero = document.getElementById('numero')
	let cep = document.getElementById('cep')
	let telefone = document.getElementById('telefone')
	let celular = document.getElementById('celular')
	let email = document.getElementById('email')
	let dia = document.getElementById('dia')
	let mes = document.getElementById('mes')
	let ano = document.getElementById('ano')
	
	let pessoa = new Locadora(
		nome_completo.value,
		cpf.value,
		rua.value,
		numero.value,
		cep.value,
		telefone.value,
		celular.value,
		email.value,
		dia.value,
		mes.value,
		ano.value,
		1
		)

	if(pessoa.validarDados()){
		bd.gravar(pessoa)
		document.getElementById('modal_titulo').innerHTML = 'Sucesso na gravação'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Pessoa foi cadastrada com sucesso'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'
		 
		$('#modalRegistraPessoa').modal('show')

		nome_completo.value=''
		cpf.value=''
		rua.value=''
		numero.value=''
		cep.value=''
		telefone.value=''
		celular.value=''
		email.value=''
		dia.value=''
		mes.value=''
		ano.value=''
		ativo.value=''

	}else{
		document.getElementById('modal_titulo').innerHTML = 'Erro na gravação'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Verifique os campos'
		document.getElementById('modal_btn').innerHTML = 'Voltar e fechar'
		document.getElementById('modal_btn').className = 'btn btn-danger'
		$('#modalRegistraPessoa').modal('show')
	}
	

}
function carregaListaPessoas(pessoas=Array(),filtro=false){
    if(pessoas.length==0 &&filtro==false){
		pessoas=bd.recuperarTodosRegistros()
	}

	let listapessoas = document.getElementById("listaPessoas")
    listapessoas.innerHTML = ''
	pessoas.forEach(function(d){
		if(d.ativo==1)
			{
				var linha = listapessoas.insertRow()
				linha.insertCell(0).innerHTML= d.nome_completo
				linha.insertCell(1).innerHTML= d.cpf
				linha.insertCell(2).innerHTML= `Rua:${d.rua},${d.numero}`
				linha.insertCell(3).innerHTML= d.cep
				linha.insertCell(4).innerHTML= d.telefone
				linha.insertCell(5).innerHTML= d.celular
				linha.insertCell(6).innerHTML= d.email
				linha.insertCell(7).innerHTML=`${d.dia}/${d.mes}/${d.ano}`//d.dia+'/'+d.mes+'/'+d.ano
				
				//botao excluir
				let btn = document.createElement("button")
				btn.className='btn btn-danger'
				btn.innerHTML='<i class="fas fa-times"></i>'
				btn.id=`id_pessoa_${d.id}`
				btn.onclick=function(){
					let id =this.id.replace('id_pessoa_','')
					bd.remover(id)
					window.location.reload()
				}
				linha.insertCell(8).append(btn)
				console.log(d)
				
				//botao desativar
				let btn2 = document.createElement("button")
				btn2.className='btn btn-dark'
				btn2.innerHTML='<i class="fas fa-times"></i>'
				btn2.id=`id_pessoa_${d.id}`
				btn2.onclick=function(){
					let id =this.id.replace('id_pessoa_','')
					let pessoa2 = new Locadora(
						d.nome_completo,
						d.cpf,
						d.rua,
						d.numero,
						d.cep,
						d.telefone,
						d.celular,
						d.email,
						d.dia,
						d.mes,
						d.ano,
						0
						)
					bd.desativar(pessoa2,id)
					window.location.reload()
				}
				linha.insertCell(8).append(btn2)}
		})
}
function pesquisarPessoa(){
	let nome_completo = document.getElementById('nome_completo').value
	let cpf = document.getElementById('cpf').value

	let pessoa = new Locadora(nome_completo,cpf,'','','','','','','','','','')
	let pessoas = bd.pesquisar(pessoa)

	this.carregaListaPessoas(pessoas,true)
}